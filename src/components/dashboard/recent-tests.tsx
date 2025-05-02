import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { fetchUserTests } from "@/lib/features/dashboard.slice";

interface RecentTestsProps {
  showAll?: boolean;
}

interface Test {
  _id: string;
  testName: string;
  subjectName: string;
  className: string;
  difficultyLevel: string;
  score: number;
  marksObtained: number;
  createdAt: string;
}

export function RecentTests({ showAll = false }: RecentTestsProps) {
  const dispatch = useAppDispatch();
  const [tests, setTests] = React.useState([]);
  const fetchTestInfo = async() => {
    const tests = await dispatch(fetchUserTests());
    setTests(tests.payload.tests.formattedTests);
  }
  useEffect(() => {
    fetchTestInfo();
  }, [dispatch]);

  const displayTests = showAll ? tests : tests.slice(0, 3);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "success"; // Green
      case "medium":
        return "warning"; // Amber
      case "hard":
        return "error";   // Red
      default:
        return "default";
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayTests.map((test: Test) => (
              <TableRow key={test._id}>
                <TableCell sx={{ fontWeight: "bold" }}>{test.testName}</TableCell>
                <TableCell>{test.subjectName}</TableCell>
                <TableCell>{test.className}</TableCell>
                <TableCell>
                  <Chip
                    label={test.difficultyLevel}
                    color={getDifficultyColor(test.difficultyLevel)}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>{test.marksObtained}</TableCell>
                <TableCell>{test.createdAt.slice(0, 10)}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" size="small">
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!showAll && (
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" size="small">
            View All Tests
          </Button>
        </div>
      )}
    </>
  );
}
