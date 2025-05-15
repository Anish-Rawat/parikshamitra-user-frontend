'use client'
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardActionArea, Button, Typography, Breadcrumbs } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { filteredSubjects, getClassesMiddleware } from "@/utils/helper";
import { ACCESS_TOKEN } from "@/utils/constants";

interface SubjectPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const { type, id } = params;
  const dispatch = useDispatch<AppDispatch>();
  const {data:session} = useSession();
    const accessToken = useAppSelector((state:RootState)=>state.auth.tokens.accessToken)
  const totalClassesAndStreams  = useAppSelector((state)=>state.class.data)
  console.log("totalClassesAndStreams",totalClassesAndStreams)
  const subjects  = useAppSelector((state)=>state.subject.data)
  const currentClassOrStream = totalClassesAndStreams?.find((item) => item.classId === id);
  console.log("currentClassOrStream",currentClassOrStream)
  console.log("subjects",subjects);
  useEffect(() => {
    if(accessToken){
      getClassesMiddleware(dispatch,accessToken)
    filteredSubjects(dispatch, accessToken, id, 1, 10);
    }
  }, [dispatch, id,accessToken]);
  // Validate type
  if (type !== "class" && type !== "stream") {
    notFound();
  }

  let title ;
  if(type === "class"){
    if(currentClassOrStream){
      title = `Class ${currentClassOrStream?.className}`;
    }else{
      title = "";
    }
  }else if(type === "stream"){
    if(currentClassOrStream){
      title = `Stream ${currentClassOrStream?.className}`
    }
    else{
      title = "";
    }
  }

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
        {subjects?.map((subject) => (
          <Link href={`/preparation/${type}/${id}/subject/${subject?.subjectId}?difficulty=easy&page=1`} key={subject?.subjectId}>
            <Card
              sx={{
                transition: "all 0.3s",
                "&:hover": { borderColor: "purple", boxShadow: 3 },
                height: "100%",
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardHeader
                  title={<Typography variant="h6">{subject?.subjectName}</Typography>}
                  subheader={<Typography variant="body2" color="textSecondary">{subject?.totalQuestionsByClassAndSubject} questions available</Typography>}
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