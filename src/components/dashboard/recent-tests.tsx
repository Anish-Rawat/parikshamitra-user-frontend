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

interface RecentTestsProps {
  showAll?: boolean;
}

export function RecentTests({ showAll = false }: RecentTestsProps) {
  const tests = [
    {
      id: "TEST-1001",
      title: "Mathematics Mid-Term",
      subject: "Mathematics",
      class: "Class 8",
      score: "78%",
      date: "2023-04-15",
      difficulty: "Medium",
    },
    {
      id: "TEST-1002",
      title: "Science Quiz",
      subject: "Science",
      class: "Class 9",
      score: "85%",
      date: "2023-04-12",
      difficulty: "Easy",
    },
    {
      id: "TEST-1003",
      title: "English Grammar Test",
      subject: "English",
      class: "Class 7",
      score: "92%",
      date: "2023-04-10",
      difficulty: "Easy",
    },
    {
      id: "TEST-1004",
      title: "Physics Final Exam",
      subject: "Physics",
      class: "Class 10",
      score: "68%",
      date: "2023-04-08",
      difficulty: "Hard",
    },
    {
      id: "TEST-1005",
      title: "Computer Science Basics",
      subject: "Computer Science",
      class: "Class 11",
      score: "75%",
      date: "2023-04-05",
      difficulty: "Medium",
    },
  ];

  const displayTests = showAll ? tests : tests.slice(0, 3);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "success"; // Green
      case "Medium":
        return "warning"; // Amber
      case "Hard":
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
            {displayTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell sx={{ fontWeight: "bold" }}>{test.title}</TableCell>
                <TableCell>{test.subject}</TableCell>
                <TableCell>{test.class}</TableCell>
                <TableCell>
                  <Chip
                    label={test.difficulty}
                    color={getDifficultyColor(test.difficulty)}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>{test.score}</TableCell>
                <TableCell>{test.date}</TableCell>
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
