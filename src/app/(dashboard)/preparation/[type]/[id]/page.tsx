'use client'
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardActionArea, Button, Typography, Breadcrumbs } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { ClassInterface } from "@/common/interface";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { filteredSubjects } from "@/utils/helper";
import { ACCESS_TOKEN } from "@/utils/constants";
import { useAppSelector } from "@/lib/hooks";

interface SubjectPageProps {
  params: ClassInterface
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const { className, classId='', totalSubjects,category } = params;
  const dispatch = useDispatch<AppDispatch>();
  const {data:session} = useSession();
  const subjects  = useAppSelector((state)=>state.subject.data)
  console.log("subjects",subjects);
  useEffect(()=>{
    filteredSubjects(dispatch,ACCESS_TOKEN,classId,1,10)
  })
  // Validate type
  if (category !== "class" && category !== "stream") {
    notFound();
  }

  const title = category === "class" ? `Class ${classId}` : capitalizeFirstLetter(classId);

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Breadcrumbs separator={<ChevronRight className="h-4 w-4" />} aria-label="breadcrumb">
          <Link href="/preparation">Preparation</Link>
          <Typography color="text.primary">{title}</Typography>
        </Breadcrumbs>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {title} Subjects
        </Typography>
        <Typography color="textSecondary">Select a subject to start practicing</Typography>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Link href={`/preparation/${category}/${classId}/subject/${subject.subjectId}`} key={subject.subjectId}>
            <Card
              sx={{
                transition: "all 0.3s",
                "&:hover": { borderColor: "purple", boxShadow: 3 },
                height: "100%",
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardHeader
                  title={<Typography variant="h6">{subject.name}</Typography>}
                  subheader={<Typography variant="body2" color="textSecondary">{subject.questions} questions available</Typography>}
                />
                <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="textSecondary">
                    Tap to start practicing
                  </Typography>
                  <Button variant="outlined" size="small">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function getSubjects(type: string, id: string) {
  if (type === "class") {
    return [
      { id: "mathematics", name: "Mathematics", questions: 120 },
      { id: "science", name: "Science", questions: 95 },
      { id: "english", name: "English", questions: 85 },
      { id: "social-studies", name: "Social Studies", questions: 75 },
      { id: "computer-science", name: "Computer Science", questions: 60 },
    ];
  } else {
    if (id === "non-medical") {
      return [
        { id: "physics", name: "Physics", questions: 110 },
        { id: "chemistry", name: "Chemistry", questions: 95 },
        { id: "mathematics", name: "Mathematics", questions: 120 },
        { id: "computer-science", name: "Computer Science", questions: 80 },
      ];
    } else if (id === "medical") {
      return [
        { id: "physics", name: "Physics", questions: 110 },
        { id: "chemistry", name: "Chemistry", questions: 95 },
        { id: "biology", name: "Biology", questions: 130 },
      ];
    } else {
      return [
        { id: "economics", name: "Economics", questions: 85 },
        { id: "business-studies", name: "Business Studies", questions: 90 },
        { id: "accountancy", name: "Accountancy", questions: 100 },
      ];
    }
  }
}

function capitalizeFirstLetter(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
