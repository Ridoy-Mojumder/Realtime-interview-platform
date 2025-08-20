import { getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  interviewId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "mixed" : type;
  const formatedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMMM D, YYYY");
  return (
    <div className="card-border w-[360px] min-h-96 max-sm:w-full ">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            {type}
          </div>
        </div>
        <Image
          src={getRandomInterviewCover()}
          alt="Interview Cover"
          width={60}
          height={60}
          className="rounded-full object-fit size-[90px]"
        />

        <h3 className=" capitalize">{role} developer {normalizedType}</h3>

        <div className="flex flex-row gap-5 ">
          <div className="flex flex-row gap-2">
            <Image
              src="/calendar.svg"
              alt="Calendar Icon"
              width={22}
              height={22}
            />
            <p>{formatedDate}</p>
          </div>
          <div className="flex flex-row gap-2">
            <Image src="/star.svg" alt="Star Icon" width={22} height={22} />
            <p>{feedback?.totalScore || "___"}/100</p>
          </div>
        </div>
        <p>
          {feedback?.finalAssessment ||
            "You haven't taken the interview yet. Taken it now to improve your skills!"}
        </p>
        <div className="flex flex-row items-center justify-between gap-3 ">
          <DisplayTechIcons techStack={techstack} />
          <Button className="btn-primary">
            <Link
              href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
