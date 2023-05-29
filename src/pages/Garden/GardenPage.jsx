import React from "react";
import { useParams } from "react-router-dom";

export default function GardenPage() {
  const params = useParams().userId;

  return (
    <React.Fragment>
      {params}
    </React.Fragment>
  )
}