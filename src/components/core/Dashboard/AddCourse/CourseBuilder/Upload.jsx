import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
// It gives us a drag-and-drop area where the user can drop a file (image or video) or click to open the file picker
import { FiUploadCloud } from "react-icons/fi"

import "video-react/dist/video-react.css"
// gives default styles for the video player.
import { Player } from "video-react"
//To render a video player (with controls like play/pause/volume) in React apps.

{/* <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          /> */}
export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,//video (boolean): if true, we only accept and preview videos; if false, we only accept images.but we passing true from its parent
  viewData = null,//may have url to show else not
  editData = null,
}) {

  const [selectedFile, setSelectedFile] = useState(null)//, we store that raw File object here
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : "")
  //this is a data URL that we use to show a preview image or video. If the component was opened in “view” or “edit” mode and there’s already a video/image URL, we start with that. Otherwise it’s empty.
  const inputRef = useRef(null)
//gets integrated with getInputProps() and is called when we drop a file
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)//fill that url variable
      setSelectedFile(file)//saves the file in state variable
    }
  }

  const { getRootProps,
     getInputProps, 
     isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
//if video=false then images formats are accepted else video formats 
    onDrop,
  })
//the purpose of this fn is to convert file in base64 url and set it in state variable 
  const previewFile = (file) => {
    const reader = new FileReader()
    //FileReader is a built-in browser API that can read file contents (images, videos, PDFs, etc.) 
    reader.readAsDataURL(file)//convert file to base64 url
    reader.onloadend = () => {
      setPreviewSource(reader.result)
      //update the state variable with with url
    }
  }

  useEffect(() => {
    register(name, { required: true })
   
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
   
  }, [selectedFile, setValue])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
{/* isDragActive is from useDropzone it becomes true when user is dragging a file background color changes to rb-600 otherwise its rb-700*/}
      <div
      
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
{/* if a file is selected previewSource has url then show video(using player of video-react) or img */}
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : 
            (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {/* now cancel btn */}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          
          <label htmlFor="video" >
{/* if no file is selected and user is here to insert a video */}
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
 {/* getRootProps() and getInputProps() come from useDropzone, getRooProps()(its an event listener) integrates onDrop() fn.They wire up the drag-n-drop behavior and file input correctly ,,
 getInputProps()=lets us click and select files*/}

            <input {...getInputProps()} ref={inputRef} id="video" />
              
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
          </label>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
//Sometimes you need to focus an input, scroll to an element, or trigger a video.In those cases, you need a direct reference to the DOM node.React doesn't let you access DOM nodes directly using id or className—you use ref.Unlike useState, changing a value stored in useRef does NOT re-render the component.

//useRef is a React Hook that lets you:
// Access and control DOM elements directly
// Store a mutable value that doesn’t cause re-render when changed

// import { useRef } from 'react';
// function InputFocus() {

//   const inputRef = useRef(null);

//   const handleClick = () => {
//     // Focus the input element
//     inputRef.current.focus();
//   };

//   return (
//     <div>
//       <input ref={inputRef} type="text" placeholder="Click button to focus me" />
//       <button onClick={handleClick}>Focus Input</button>
//     </div>
