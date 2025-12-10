import React, { useEffect, useState } from "react";
import UsersNavbar from "../../../component/UsersNavbar";

function DailyActivity() {
  return (
    <div>
      <UsersNavbar />
      <div className="flex flex-ro align-middle justify-center py-5">
        <form className=" grid ">
          <div className="grid">
            <label htmlFor="date">Report Date</label>
            <input type="date" placeholder="Add your name" />
          </div>
          <div className="grid">
            <label htmlFor="text">Category</label>
            <input type="Text" placeholder="Category" />
          </div>
          <div className="grid">
            <label htmlFor="date">Descriptions</label>
            <input type="text" placeholder="Add Descriptions" />
          </div>

         
        </form>
      </div>
    </div>
  );
}

export default DailyActivity;
