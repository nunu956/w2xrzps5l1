import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { sortAndDeduplicate, UserScoreRecord } from "./preprocessing";

interface RankingProps {
  data: UserScoreRecord[];
}
export function Ranking({ data }: RankingProps) {
  const finalScores = sortAndDeduplicate(data);
  const [selectedUser, setSelectedUser] = useState("");

  const toggleUserDetails = (userName: string) => {
    if (selectedUser === userName) {
      // Deselect the user and show all users' ranking
      setSelectedUser("");
    } else {
      // Select a user and show their scores
      setSelectedUser(userName);
    }
  };

  const filterAndSortScores = (
    data: UserScoreRecord[],
    userName: string
  ): UserScoreRecord[] => {
    return data
      .filter((user) => user.name === userName) // Filter by the user name
      .sort((a, b) => b.score - a.score); // Sort by score in descending order
  };

  const displayScores = selectedUser
    ? filterAndSortScores(data, selectedUser)
    : finalScores;

  return (
    <Box overflowX="auto">
      <p>
        <strong>Tip:</strong> Click on a user to view their scores. Click again
        to return to the overall rankings.
      </p>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>User</Th>
            <Th isNumeric>{selectedUser ? "Scores" : "Highest Score"}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayScores.map((user, index) => (
            <Tr key={`${user.name}-${user.score}`}>
              <Td>{index + 1}</Td>
              <Td
                onClick={() => toggleUserDetails(user.name)}
                style={{ cursor: "pointer" }}
              >
                {user.name}
              </Td>
              <Td isNumeric>{user.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
