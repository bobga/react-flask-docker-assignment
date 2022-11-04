import React from "react";
import { useNavigate, useParams } from "react-router-dom"
import Users from "./Users"
import Files from "./Files"

function Project () {

  const navigateTo = useNavigate()
  const { id } = useParams();

  return (
    <div>
      <div class="d-flex flex-row justify-content-evenly p-2">
        <h1>Project ID: {id} </h1>
        <button type="button" class="btn btn-primary" onClick={() => navigateTo('/')}>home</button>
      </div>
      
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button class="nav-link active" id="nav-users-tab" data-bs-toggle="tab" data-bs-target="#nav-users" type="button" role="tab" aria-controls="nav-users" aria-selected="true">Users</button>
          <button class="nav-link" id="nav-files-tab" data-bs-toggle="tab" data-bs-target="#nav-files" type="button" role="tab" aria-controls="nav-files" aria-selected="false">Files</button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab" tabindex="0">
          <Users project_id={id} />
        </div>
        <div class="tab-pane fade" id="nav-files" role="tabpanel" aria-labelledby="nav-files-tab" tabindex="0">
          <Files project_id={id} />
        </div>
      </div>
    </div>
  );
}

export default Project