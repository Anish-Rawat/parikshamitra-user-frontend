import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardActionArea, Button, Typography, Breadcrumbs } from "@mui/material";
import { ChevronRight } from "lucide-react";

interface SubjectPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const { type, id } = params;

  // Validate type
  if (type !== "class" && type !== "stream") {
    notFound();
  }

  const title = type === "class" ? `Class ${id}` : capitalizeFirstLetter(id);

  const subjects = getSubjects(type, id);

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
          <Link href={`/preparation/${type}/${id}/subject/${subject.id}`} key={subject.id}>
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
