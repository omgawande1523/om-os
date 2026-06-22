export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  forks_count: number;
  updated_at: string;
}

export interface GitHubStatsData {
  reposCount: number;
  starsCount: number;
  followers: number;
  contributions: number;
  languages: { name: string; percentage: number; color: string }[];
  repos: GitHubRepo[];
}

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'Automatic-waste-segregation-with-computer-vision',
    description: 'Create a system that uses image recognition to automatically classify waste (plastic, paper, metal, organic, e-waste) and guide sorting bins + track contamination.',
    html_url: 'https://github.com/omgawande1523/Automatic-waste-segregation-with-computer-vision',
    stargazers_count: 0,
    language: 'JavaScript',
    forks_count: 0,
    updated_at: '2026-06-22T05:00:00Z'
  },
  {
    id: 2,
    name: 'AadhaarX',
    description: 'AI-Powered Secure Digital Identity & Verification Ecosystem for India\'s Digital Public Infrastructure (DPI)',
    html_url: 'https://github.com/omgawande1523/AadhaarX',
    stargazers_count: 0,
    language: 'TypeScript',
    forks_count: 0,
    updated_at: '2026-06-22T04:30:00Z'
  },
  {
    id: 3,
    name: 'AegisEdge',
    description: 'Secure Offline Facial Recognition and Liveness Detection system for Datalake 3.0',
    html_url: 'https://github.com/omgawande1523/AegisEdge',
    stargazers_count: 0,
    language: 'TypeScript',
    forks_count: 0,
    updated_at: '2026-06-22T04:20:00Z'
  },
  {
    id: 4,
    name: 'routeiq-enterprise',
    description: 'Enterprise smart-city road health intelligence platform RouteIQ',
    html_url: 'https://github.com/omgawande1523/routeiq-enterprise',
    stargazers_count: 0,
    language: 'TypeScript',
    forks_count: 0,
    updated_at: '2026-06-22T04:10:00Z'
  },
  {
    id: 5,
    name: 'ai-autonomous-cyber-threat-detection',
    description: 'Autonomous cyber threat detection and mitigation system utilising machine learning models to identify anomaly network traffic.',
    html_url: 'https://github.com/omgawande1523/ai-autonomous-cyber-threat-detection',
    stargazers_count: 0,
    language: 'Python',
    forks_count: 0,
    updated_at: '2026-06-22T04:00:00Z'
  },
  {
    id: 6,
    name: 'Bot-Detector',
    description: 'Predictive classifier model utilizing deep learning networks to identify and block automated spam queries.',
    html_url: 'https://github.com/omgawande1523/Bot-Detector',
    stargazers_count: 0,
    language: 'Python',
    forks_count: 0,
    updated_at: '2026-06-22T03:00:00Z'
  },
  {
    id: 7,
    name: 'AgroSense',
    description: 'Smart precision agriculture analysis and crop disease detection system utilizing computer vision models.',
    html_url: 'https://github.com/omgawande1523/AgroSense',
    stargazers_count: 0,
    language: 'Python',
    forks_count: 0,
    updated_at: '2026-06-22T02:50:00Z'
  },
  {
    id: 8,
    name: 'earth-science-agi',
    description: 'Artificial General Intelligence solutions applied to geographical, climatic and earth science datasets.',
    html_url: 'https://github.com/omgawande1523/earth-science-agi',
    stargazers_count: 0,
    language: 'Python',
    forks_count: 0,
    updated_at: '2026-06-22T02:40:00Z'
  },
  {
    id: 9,
    name: 'MathGPT',
    description: 'Mathematical tutoring assistant powered by LLMs for reasoning and step-by-step math solver.',
    html_url: 'https://github.com/omgawande1523/MathGPT',
    stargazers_count: 0,
    language: 'Python',
    forks_count: 0,
    updated_at: '2026-06-22T02:30:00Z'
  },
  {
    id: 10,
    name: 'Sarcasm-Detection',
    description: 'NLP sarcasm classifier utilizing LSTM and recurrent architectures on social queries.',
    html_url: 'https://github.com/omgawande1523/Sarcasm-Detection',
    stargazers_count: 0,
    language: 'Python',
    forks_count: 0,
    updated_at: '2026-06-22T02:20:00Z'
  },
  {
    id: 11,
    name: 'Urdu-Violence-Detection-AI',
    description: 'Applied deep learning models for detecting violent speech patterns and anomalies in Urdu text datasets.',
    html_url: 'https://github.com/omgawande1523/Urdu-Violence-Detection-AI',
    stargazers_count: 0,
    language: 'Python',
    forks_count: 0,
    updated_at: '2026-06-22T02:10:00Z'
  },
  {
    id: 12,
    name: 'Waste-Management',
    description: 'Database schemas and backend routing coordinates for decentralized waste logistics.',
    html_url: 'https://github.com/omgawande1523/Waste-Management',
    stargazers_count: 0,
    language: 'Python',
    forks_count: 0,
    updated_at: '2026-06-22T02:00:00Z'
  }
];

const FALLBACK_DATA: GitHubStatsData = {
  reposCount: 15,
  starsCount: 2,
  followers: 5,
  contributions: 46,
  languages: [
    { name: 'Python', percentage: 60, color: 'bg-neo-blue' },
    { name: 'TypeScript', percentage: 25, color: 'bg-neo-mint' },
    { name: 'JavaScript', percentage: 10, color: 'bg-neo-pink' },
    { name: 'Other', percentage: 5, color: 'bg-neo-yellow' }
  ],
  repos: FALLBACK_REPOS
};

const CACHE_KEY = 'github_data_cache';
const TIMESTAMP_KEY = 'github_data_timestamp';
const CACHE_DURATION_MS = 3600000; // 1 hour

export async function fetchGitHubData(): Promise<GitHubStatsData> {
  if (typeof window === 'undefined') {
    return FALLBACK_DATA;
  }

  // Check cache
  const cachedDataStr = localStorage.getItem(CACHE_KEY);
  const cachedTimeStr = localStorage.getItem(TIMESTAMP_KEY);
  
  if (cachedDataStr && cachedTimeStr) {
    const cachedTime = parseInt(cachedTimeStr, 10);
    const now = Date.now();
    
    if (now - cachedTime < CACHE_DURATION_MS) {
      try {
        return JSON.parse(cachedDataStr);
      } catch (e) {
        // Parse error, clear cache and proceed to fetch
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(TIMESTAMP_KEY);
      }
    }
  }

  try {
    // Fetch profile
    const profileRes = await fetch('https://api.github.com/users/omgawande1523');
    if (!profileRes.ok) throw new Error('Failed to fetch profile');
    const profile = await profileRes.json();

    // Fetch repos
    const reposRes = await fetch('https://api.github.com/users/omgawande1523/repos?per_page=100&sort=updated');
    if (!reposRes.ok) throw new Error('Failed to fetch repositories');
    const reposData: any[] = await reposRes.json();

    // Filter out forks if preferred, or keep all. Let's filter to real user repos
    const userRepos: GitHubRepo[] = reposData
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at
      }));

    // Calculate stars
    const starsCount = userRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

    // Calculate languages
    const langCounts: { [key: string]: number } = {};
    let totalLangRepos = 0;
    
    userRepos.forEach((repo) => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        totalLangRepos++;
      }
    });

    const colorsMap: { [key: string]: string } = {
      'Python': 'bg-neo-blue',
      'JavaScript': 'bg-neo-pink',
      'TypeScript': 'bg-neo-mint',
      'HTML': 'bg-neo-yellow',
      'CSS': 'bg-neo-orange',
      'C++': 'bg-neo-pink',
      'Java': 'bg-neo-blue'
    };

    const languages = Object.keys(langCounts)
      .map((name) => {
        const percentage = Math.round((langCounts[name] / totalLangRepos) * 100);
        return {
          name,
          percentage,
          color: colorsMap[name] || 'bg-neo-yellow'
        };
      })
      .sort((a, b) => b.percentage - a.percentage);

    const result: GitHubStatsData = {
      reposCount: profile.public_repos || userRepos.length,
      starsCount: starsCount || 2,
      followers: profile.followers || 5,
      contributions: 46, // Fallback statistic or event logs length
      languages: languages.length > 0 ? languages : FALLBACK_DATA.languages,
      repos: userRepos.length > 0 ? userRepos : FALLBACK_REPOS
    };

    // Save to cache
    localStorage.setItem(CACHE_KEY, JSON.stringify(result));
    localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());

    return result;
  } catch (error) {
    console.warn('GitHub API failed or rate-limited. Serving cached/fallback data.', error);
    // If API failed but we have stale cache, use it
    if (cachedDataStr) {
      try {
        return JSON.parse(cachedDataStr);
      } catch (e) {}
    }
    return FALLBACK_DATA;
  }
}
