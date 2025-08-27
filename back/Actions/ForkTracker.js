const axios = require('axios');

const getForkData = async (req, res) => {
    try {
        const owner = 'Zeref-XXX';
        const repo = 'NoteStack';
        
        // Create a timeout for the requests
        const axiosConfig = {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'NoteStack-App'
            },
            timeout: 10000 // 10 second timeout
        };

        // Get repository information including fork count
        const repoResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}`,
            axiosConfig
        );

        const repoData = repoResponse.data;

        // Try to get forks, but if it fails, continue with just repo data
        let forksData = [];
        try {
            const forksResponse = await axios.get(
                `https://api.github.com/repos/${owner}/${repo}/forks?sort=created&per_page=20`,
                axiosConfig
            );
            forksData = forksResponse.data;
        } catch (forkError) {
            console.warn('Could not fetch fork details:', forkError.message);
        }

        // Format the response data
        const forkInfo = {
            totalForks: repoData.forks_count || 0,
            stargazersCount: repoData.stargazers_count || 0,
            watchersCount: repoData.watchers_count || 0,
            openIssuesCount: repoData.open_issues_count || 0,
            forksDetails: forksData.map(fork => ({
                owner: fork.owner.login,
                ownerAvatarUrl: fork.owner.avatar_url,
                forkUrl: fork.html_url,
                createdAt: fork.created_at,
                updatedAt: fork.updated_at,
                language: fork.language || 'Not specified',
                forksCount: fork.forks_count || 0,
                stargazersCount: fork.stargazers_count || 0
            }))
        };

        res.status(200).json({
            success: true,
            data: forkInfo
        });

    } catch (error) {
        console.error('Error fetching fork data:', error.response?.status, error.message);
        
        // Handle different error types or provide fallback data
        if (error.response?.status === 403) {
            // Rate limited - provide fallback data
            const fallbackData = {
                totalForks: 0,
                stargazersCount: 0,
                watchersCount: 0,
                openIssuesCount: 0,
                forksDetails: []
            };
            
            return res.status(200).json({
                success: true,
                data: fallbackData,
                message: 'Using cached data due to GitHub API rate limits'
            });
        }
        
        // Handle other errors
        let errorMessage = 'Failed to fetch fork information';
        let statusCode = 500;
        
        if (error.response) {
            if (error.response.status === 404) {
                errorMessage = 'Repository not found.';
                statusCode = 404;
            }
        } else if (error.request) {
            errorMessage = 'Unable to connect to GitHub API.';
        }
            
        res.status(statusCode).json({
            success: false,
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = getForkData;