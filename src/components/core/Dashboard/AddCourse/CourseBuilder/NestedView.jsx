import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VscAdd, VscEdit, VscTrash, VscTriangleDown } from 'react-icons/vsc';
import { RxDropdownMenu } from "react-icons/rx";
import SubSectionModal from "./SubsectionModal"
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { deleteSection } from "../../../../../services/operations/courseDetailsAPI";
import { deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
const NestedView = ({ handleChangeEditSectionName }) => {
    // handleChangeEditSectionName iska bus itna hi kaam hai ki yeh toggle karta hai input box ko with empty or with section that is to be changed
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handledeleteSection = async (sectionId) => {
        const result = await deleteSection({ sectionId, courseId: course._id }, token);
        if (result) {
            dispatch(setCourse(result));
            setConfirmationModal(null);
        }
    };

    const handledeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, courseId: course._id, sectionId }, token);
        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    };

    return (
        <div>
            <div>
  {/*details tag is a closure widget which lets u to show some content by clicking on a button or hide it , summary will always be shown p or other divs tags are hidden or shown  */}
                {course?.courseContent?.map((section) => (
                    <details key={section._id} className="mt-4" open>
                        <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                            {/*items-center=align item centrally on cross axis here its a vertical axis it could be horizonatal axis if we do flex-col */}
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu size={25} className="text-richblack-50" />
                                <p className="font-semibold text-richblack-50">{section.sectionName}</p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                {/* gap of 3 between the childrens */}
                                <button>
                                    <VscEdit
                                        className="text-lg text-cichblack-50"
                                        onClick={() => {
                                            handleChangeEditSectionName(section._id, section.sectionName);
                                        }}
                                    ></VscEdit>
                                </button>
                                <button>
                                    <VscTrash
                                        className='text-lg text-richblack-50'
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Delete this section ?",
                                                text2: "All the lectures in this section will be deleted",
                                                btn1Text: 'Delete',
                                                btn2Text: 'Cancel',
                                                btn1Handler: () => handledeleteSection(section._id),
                                                btn2Handler: () => setConfirmationModal(null)
                                            });
                                        }}
                                    ></VscTrash>
                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                 {/*text-md=controls the text-size while font-medium=controls the font-weight(boldness)  */}
                                <VscTriangleDown className='text-lg text-richblack-50' />
                            </div>
                        </summary>
{/* subsections yahan pr ya toh add subsection btn ya fir delete subsection pr click hoga jispar click hoga uski value null se true hojayegi aur fir uske liye modal call hoga */}
                        <div className="px-6 pb-4">
                            {
                                section?.subSection?.map((subSection) => (
                                    <div
                                        onClick={(e) => {
                                            if (e.currentTarget != e.target)
                                                return;
                                            // this fn help to identify if this particular div(parent) is clicked or one of its children is clicked,e.currentTarget=refers to current div(parent) ,e.target=actual element that is clicked maybe a child div
                                            
                                            // section._id
                                            setViewSubSection(subSection);
                                        }}
                                        key={subSection._id}
                                        className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 z-0"
                                    >
                                        <div className="flex items-center gap-x-3">
                                            <RxDropdownMenu size={25} className="text-richblack-50"></RxDropdownMenu>
                                            <p className='font-semibold text-richblack-50'>{subSection.title}</p>
                                        </div>
                                        <div className='flex items-center gap-x-3'>
                                            <button>
                                                {/* <VscEdit
                                                    className='text-lg text-richblack-50 z-50'
                                                    onClick={() => {
                                                        setEditSubSection(subSection);
                                                    }}
                                                ></VscEdit> */}
                                            </button>
                                            <button>
                                                <VscTrash
                                                    className='text-lg text-richblack-50 z-50'
                                                    size={21}
                                                    onClick={() => {
                                                        setConfirmationModal({
                                                            text1: "Delete this sub section ?",
                                                            text2: "Selected lecture will be deleted",
                                                            btn1Text: "Delete",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: () => handledeleteSubSection(subSection._id, section._id),
                                                            btn2Handler: () => setConfirmationModal(null),
                                                        });
                                                    }}
                                                ></VscTrash>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            {/* "add lecture" button for each section after showing all the subsections of each section */}
                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className="mt-3 flex items-center gap-x-1 text-yellow-50 font-bold"
                            >
                                <VscAdd className="text-lg text-yellow-50"></VscAdd>
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>

            {
                addSubSection
                    ? <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />
                    : editSubSection
                        ? <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />
                        : viewSubSection
                            ? <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />
                            : null
            }

            {
                confirmationModal ? (
                    <ConfirmationModal
                        modalData={confirmationModal}
                        setConfirmationModal={setConfirmationModal}
                    ></ConfirmationModal>
                ) : null
            }
        </div>
    );
};

export default NestedView; 
