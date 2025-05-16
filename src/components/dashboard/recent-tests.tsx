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
  Box,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

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
        return "warning"; // Orange
      case "Hard":
        return "error"; // Red
      default:
        return "default";
    }
  };

  const getScoreColor = (score: string) => {
    const numericScore = parseInt(score);
    if (numericScore >= 85) return "#4caf50"; // Green
    if (numericScore >= 70) return "#ff9800"; // Orange
    return "#f44336"; // Red
  };

  return (
    <>
      <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ 
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "4px",
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Test</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Class</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Difficulty</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayTests.map((test) => (
              <TableRow 
                key={test.id} 
                sx={{ 
                  "&:hover": { 
                    backgroundColor: "rgba(0,0,0,0.02)",
                  },
                  transition: "background-color 0.2s"
                }}
              >
                <TableCell sx={{ fontWeight: "medium" }}>{test.title}</TableCell>
                <TableCell>{test.subject}</TableCell>
                <TableCell>{test.class}</TableCell>
                <TableCell>
                  <Chip
                    label={test.difficulty}
                    color={getDifficultyColor(test.difficulty)}
                    size="small"
                    sx={{ 
                      fontWeight: "medium",
                      minWidth: "70px",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box 
                    sx={{ 
                      fontWeight: "bold", 
                      color: getScoreColor(test.score),
                      display: "inline-block",
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      backgroundColor: `${getScoreColor(test.score)}10`,
                    }}
                  >
                    {test.score}
                  </Box>
                </TableCell>
                <TableCell>{test.date}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Tooltip title="View Details">
                      <IconButton size="small" color="primary" sx={{ mr: 1 }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download Report">
                      <IconButton size="small" color="secondary">
                        <FileDownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!showAll && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button 
            variant="outlined" 
            color="secondary" 
            size="medium"
            endIcon={<VisibilityIcon />}
            sx={{ borderRadius: 6, px: 3 }}
          >
            View All Tests
          </Button>
        </Box>
      )}
    </>
  );
}
