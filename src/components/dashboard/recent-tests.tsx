'use client'
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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { getTestListsByUserId } from "@/redux/slices/user/userSlice";

interface RecentTestsProps {
  showAll?: boolean;
}

export function RecentTests({ showAll = false }: Readonly<RecentTestsProps>) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state)=>state.auth.tokens.accessToken)
  const userInfo = useAppSelector((state)=>state.auth.user)
  console.log("userinfo",userInfo)
  const tests = useAppSelector((state)=>state.user.getTestsByUserId).testsListing
  const userId = userInfo?._id
  useEffect(()=>{
    console.log("accessToken")
    if(accessToken){
      console.log("accessToken")
      dispatch(getTestListsByUserId({accessToken}))
    }
  },[dispatch,accessToken,userId])
  console.log("tests",tests)
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
                key={test._id} 
                sx={{ 
                  "&:hover": { 
                    backgroundColor: "rgba(0,0,0,0.02)",
                  },
                  transition: "background-color 0.2s"
                }}
              >
                <TableCell sx={{ fontWeight: "medium" }}>{test.testName}</TableCell>
                <TableCell>{test.subjectName}</TableCell>
                <TableCell>{test.className}</TableCell>
                <TableCell>
                  <Chip
                    label={test.difficultyLevel}
                    color={getDifficultyColor(test.difficultyLevel)}
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
                      color: getScoreColor((test.marksObtained).toString()),
                      display: "inline-block",
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      backgroundColor: `${getScoreColor((test.marksObtained).toString())}10`,
                    }}
                  >
                    {test.marksObtained}
                  </Box>
                </TableCell>
                <TableCell>{test.createdAt}</TableCell>
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
