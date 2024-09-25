"use client";
import routes from "@/app/routes";
import ExamHistory from "@/app/ui/dashboard/exam-completed/ExamHistory";
import { Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const acstoken =
        status === "authenticated" ? `Bearer ${session.token}` : "";

      const hdr =
        acstoken == "" ? {} : { headers: { Authorization: `${acstoken}` } };

      const response = await axios.get(routes.getExamHistoryWithAuth, {
        ...hdr,
      });
      setData(response.data);
    } catch (error: any) {
    } 

  };

  useEffect(() => {
    fetchData();
  }, [status]);

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1, padding: 4, margin: 4 }}>
          <Typography variant="h3">Exam History</Typography>
        </Box>
        {status === "unauthenticated" ? (
          <Box sx={{ flexGrow: 1, padding: 4, margin: 4 }}>
            <Typography variant="h4">
              Please Sign in to View the list of Exams.
            </Typography>{" "}
          </Box>
        ) : (
          ""
        )}
        <ExamHistory data={data} />
      </Container>
    </>
  );
};

export default Page;
