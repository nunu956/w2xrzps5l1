import React, { useState, FormEvent } from "react";
import { Button, Input } from "@chakra-ui/react";

interface UserFormProps {
  onSubmit: (name: string, score: number) => void;
}

export function UserForm({ onSubmit }: UserFormProps) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && score) {
      onSubmit(name, parseInt(score, 10));
      setName("");
      setScore("");
    }
  };

  return (
    <>
      <p>
        <strong>Tip:</strong> You can manually add users and their scores below.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name: </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            type="text"
            required
          />
        </div>
        <div>
          <label>Score: </label>
          <Input
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Enter score"
            type="number"
            required
          />
        </div>
        <Button type="submit" mt="4">
          Submit
        </Button>
      </form>
    </>
  );
}
