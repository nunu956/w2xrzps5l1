import React, { ReactNode, useState } from "react";
import { Link } from "@chakra-ui/react";
import { Container, Box, P, VStack, HStack, H1, H2 } from "@northlight/ui";
import { palette } from "@northlight/tokens";
import { ExcelDropzone, ExcelRow } from "./excel-dropzone";
import { Ranking } from "./ranking";
import { defaultData, UserScoreRecord } from "./preprocessing";
import { UserForm } from "./user-input";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <Link
    href={href}
    isExternal
    sx={{ color: palette.blue["500"], textDecoration: "underline" }}
  >
    {children}
  </Link>
);

export default function App() {
  const [inputData, setInputData] = useState<UserScoreRecord[]>(defaultData);
  function handleSheetData(data: ExcelRow[]) {
    // replace this log with actual handling of the data
    const updatedData: UserScoreRecord[] = [...inputData, ...data];

    setInputData(updatedData);
  }

  function updateData(name: string, score: number) {
    const newData: UserScoreRecord[] = [...inputData, { name, score }];

    setInputData(newData);
  }

  return (
    <Container maxW="6xl" padding="4">
      <H1 marginBottom="4">Mediatool exercise</H1>
      <HStack spacing={10} align="flex-start">
        <ExcelDropzone
          onSheetDrop={handleSheetData}
          label="Import excel file here"
        />
        <VStack align="left">
          <Box>
            <H2>Initial site</H2>
            <P>
              Drop the excel file scores.xlsx that you will find in this repo in
              the area to the left and watch the log output in the console. We
              hope this is enough to get you started with the import.
            </P>
          </Box>
          <Box>
            <H2>Styling and Northlight</H2>
            <P>
              Styling is optional for this task and not a requirement. The
              styling for this app is using our own library Northligth which in
              turn is based on Chakra UI. You <i>may</i> use it to give some
              style to the application but again, it is entierly optional.
            </P>
            <P>
              Checkout{" "}
              <ExternalLink href="https://chakra-ui.com/">
                Chackra UI
              </ExternalLink>{" "}
              for layout components such as{" "}
              <ExternalLink href="https://chakra-ui.com/docs/components/box">
                Box
              </ExternalLink>
              ,{" "}
              <ExternalLink href="https://chakra-ui.com/docs/components/stack">
                Stack
              </ExternalLink>
              ,{" "}
              <ExternalLink href="https://chakra-ui.com/docs/components/grid">
                Grid
              </ExternalLink>
              ,{" "}
              <ExternalLink href="https://chakra-ui.com/docs/components/flex">
                Flex
              </ExternalLink>{" "}
              and others.
            </P>
            <P>
              Checkout{" "}
              <ExternalLink href="https://northlight.dev/">
                Northlight
              </ExternalLink>{" "}
              for some of our components.
            </P>
          </Box>
        </VStack>
      </HStack>

      <div>
        <Box mb={10} mt={10}>
          <Ranking data={inputData} />
        </Box>
        <UserForm onSubmit={updateData} />
      </div>
    </Container>
  );
}
