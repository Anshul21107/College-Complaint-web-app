import styled from "@emotion/styled";
// import {fa-solid fa-file} from "@fortawesome/free-solid-svg-icons";
//  
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DashboardLinkButton from "../components/DashboardLinkButton";
import Navbar from "../components/Navbar";
import SpinnerModal from "../components/SpinnerModal";
import { auth } from "../utils/Firebase";
import { createComplaint, isOfficial } from "../utils/FirebaseFunctions";
import { Statuses } from "../utils/enums";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const TextField = styled(MuiTextField)((props) => ({
  width: "80%",
  [`& fieldset`]: {
    borderRadius: "15px",
  },
}));
const ReportComplaint = () => {
  const [Media, setMedia] = useState();
  const [MediaPath, setMediaPath] = useState("");
  const [FormData, setFormData] = useState({
    mediaPath: "",
    reason: "",
    additionalInfo: "",
    reportedBy: "",
    timestamp: "",
    status: Statuses.inProgress,
    mediaType: "",
  });
  const [LoaderVisibile, setLoaderVisibile] = useState(false);
  const FileInput = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user || !isOfficial(user.uid)) {
        return navigate("/");
      }
      setFormData({ ...FormData, reportedBy: user.uid });
    });
  }, []);
  return (
    <div className="overflow-x-hidden">
      <SpinnerModal visible={LoaderVisibile} />
      <Navbar />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 className=" lg:mt-10 leading-normal font-bold text-center text-xl lg:text-[2rem] my-6 lg:text-left lg:mx-20">
        Report a Complain
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoaderVisibile(true);
          createComplaint(FormData, Media)
            .then(() => {
              toast.success("Complain Reported Successfully");
              setTimeout(() => {
                navigate("/student-dashboard");
              }, 3000);
            })
            .finally(() => {
              setLoaderVisibile(false);
            })
            .catch((err) => {
              toast.error(err.message);
            });
        }}
      >
        <input
          required
          type="file"
          ref={FileInput}
          className="opacity-0"
          accept=".pdf"
          onChange={(e) => {
            setMedia(e.target.files[0]);
            setFormData({
              ...FormData,
              mediaType: "pdf", // Set mediaType to "pdf"
            });
            setMediaPath(URL.createObjectURL(e.target.files[0]));
          }}
          name=""
          id=""
        />
        <DashboardLinkButton
          className={`${Media ? "hidden" : "block"} mx-[8vw]`}
          icon={faFile}
          name={"Upload the document"}
          onClick={() => FileInput.current.click()}
          subtitle={"Make sure that report is in proper format"}
        />
        {/* ... (existing code) */}
        <div
          className={`flex flex-col justify-center items-center mx-8 lg:mx-20 py-6 ${
            Media ? "block" : "hidden"
          }`}

        >
          <iframe
            src={MediaPath} // Use MediaPath as the source for the iframe
            title="PDF Viewer"
            width="100%"
            height="500px"

          />
          <Button
            onClick={() => FileInput.current.click()}
            hidden={Media ? false : true}
            variant="outlined"
          >
            Change File
          </Button>
        </div>
        <Box ml={'8vw'}>
          <p className="mt-6">Complain/ Leave:</p>
          <RadioGroup
            onChange={(e) => {
              setFormData({ ...FormData, reason: e.target.value });
            }}
            value={FormData.reason}
          >
            <FormControlLabel
              value="Administration Complain"
              control={<Radio />}
              label="Administration"
            />
            <FormControlLabel
              value="Mess Complain"
              control={<Radio />}
              label="Mess"
            />
            <FormControlLabel
              value="Leave application"
              control={<Radio />}
              label="Leave"
            />
            <FormControlLabel
              value="WiFi Complain"
              control={<Radio />}
              label="Wifi"
            />
            <FormControlLabel
              value="Washroom Complain"
              control={<Radio />}
              label="Washroom"
            />
            <FormControlLabel
              value="Others"
              control={<Radio />}
              label="Others"
            />
          </RadioGroup>
          <p className="my-2">Additional Information</p>
          <TextField
            multiline
            value={FormData.additionalInfo}
            onChange={(e) => {
              setFormData({ ...FormData, additionalInfo: e.target.value });
            }}
            rows={5}
            placeholder="Want to add something"
          />
          <FormControlLabel
            required
            value="terms-accepted"
            control={<Checkbox />}
            label="By clicking this checkbox, I understood that reporting fake complains against anyone will lead to actions against me."
          />
        </Box>
        <div className="flex justify-center my-8 px-40 lg:px-96">
          <Button variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReportComplaint;
