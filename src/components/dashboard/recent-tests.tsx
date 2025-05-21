"use client";
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
  Pagination,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { getTestListsByUserId } from "@/redux/slices/user/userSlice";

export function RecentTests({ tabValue }: { tabValue?: string }) {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // always fetch 10

  const accessToken = useAppSelector((state) => state.auth.tokens.accessToken);
  const userInfo = useAppSelector((state) => state.auth.user);
  const userId = userInfo?._id;

  const tests = useAppSelector(
    (state) => state.user.getTestsByUserId?.testsListing
  );
  const totalTests = useAppSelector(
    (state) => state.user.getTestsByUserId?.totalTests
  );
  const totalPages = Math.ceil(totalTests / itemsPerPage);
  const loading = useAppSelector(
    (state) => state?.user?.getTestsByUserId?.loading
  );

  useEffect(() => {
    if (accessToken && userId) {
      dispatch(
        getTestListsByUserId({
          accessToken,
          userId,
          // page: currentPage,
          // limit: itemsPerPage, // always fetch 10
        })
      );
    }
  }, [dispatch, accessToken, userId, currentPage]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "success";
      case "Medium":
        return "warning";
      case "Hard":
        return "error";
      default:
        return "default";
    }
  };

  const getScoreColor = (score: string) => {
    const numericScore = parseInt(score);
    if (numericScore >= 85) return "#4caf50";
    if (numericScore >= 70) return "#ff9800";
    return "#f44336";
  };

  const visibleTests = tabValue === "recent" ? tests : tests.slice(0, 5);

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          overflowX: "auto",
          "&::-webkit-scrollbar": { height: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "4px",
          },
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
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : (
              visibleTests.map((test) => (
                <TableRow
                  key={test._id}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.02)" },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {test.testName}
                  </TableCell>
                  <TableCell>{test.subjectName}</TableCell>
                  <TableCell>{test.className}</TableCell>
                  <TableCell>
                    <Chip
                      label={test.difficultyLevel}
                      color={getDifficultyColor(test.difficultyLevel)}
                      size="small"
                      sx={{ fontWeight: "medium", minWidth: "70px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        fontWeight: "bold",
                        color: getScoreColor(test.marksObtained.toString()),
                        display: "inline-block",
                        borderRadius: 1,
                        px: 1,
                        py: 0.5,
                        backgroundColor: `${getScoreColor(
                          test.marksObtained.toString()
                        )}10`,
                      }}
                    >
                      {test.marksObtained}
                    </Box>
                  </TableCell>
                  <TableCell>{test.createdAt}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Tooltip title="View Details">
                        <IconButton size="small" color="secondary" sx={{ mr: 1 , color: '#0000FF'}}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download Report">
                        <IconButton size="small" color="secondary" sx={{ color: '#0000FF' }}>
                          <FileDownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination only if recent tab */}
      {tabValue === "recent" && totalPages > 1 && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="secondary"
            shape="rounded"
          />
        </Box>
      )}
    </>
  );
}
