import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client.js";

export default function DataDisplay() {
  const [creators, setCreators] = useState([]);
  const navigate = useNavigate();

  async function fetchCreators() {
    const { data } = await supabase.from("user").select();
    console.log(data);
    setCreators(data);
  }

  useEffect(() => {
    fetchCreators();
  }, []);

  return <div>data</div>;
}
