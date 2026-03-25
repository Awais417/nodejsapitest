import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Server is running - API called successfully!';
  }

  async removeRepo(): Promise<string> {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || 'Awais417';
    const repo = process.env.GITHUB_REPO || 'nodejsapitest';

    if (!token) {
      return 'GITHUB_TOKEN is not set in environment variables';
    }

    try {
      await axios.delete(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      return `Repository ${owner}/${repo} has been deleted from GitHub`;
    } catch (error) {
      return `Failed to delete repo: ${error.response?.status} - ${error.response?.data?.message || error.message}`;
    }
  }
}
