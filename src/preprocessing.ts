import scores from "./scores";
import users from "./users";

interface User {
  _id: number;
  name: string;
}

interface Score {
  userId: number;
  score: number;
}

interface UserMap {
  [key: number]: string;
}

export interface UserScoreRecord {
  name: string;
  score: number;
}

function mapScoresToUsers(users: User[], scores: Score[]) {
  // Create a mapping from userId to name
  const userMap: UserMap = users.reduce((map: UserMap, user) => {
    map[user._id] = user.name;
    return map;
  }, {});

  // Map scores to users using the userMap
  const usersAndScores = scores.map((item) => {
    return { name: userMap[item.userId], score: item.score };
  });

  return usersAndScores;
}

export function sortAndDeduplicate(
  usersAndScores: UserScoreRecord[]
): UserScoreRecord[] {
  // Sort the scores in descending order
  usersAndScores.sort((a, b) => b.score - a.score);

  // Keep only the highest score for each user
  const highestScores: { [key: string]: UserScoreRecord } = {};
  usersAndScores.forEach((item) => {
    if (
      !highestScores[item.name] ||
      highestScores[item.name].score < item.score
    ) {
      highestScores[item.name] = item;
    }
  });

  return Object.values(highestScores);
}

export const defaultData = mapScoresToUsers(users, scores);
