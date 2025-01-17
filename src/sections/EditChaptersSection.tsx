import { useParams } from "react-router-dom";
import CourseForm from "../components/courses-components/CourseForm";
import { useApi } from "../hooks/useApiCall";
import { updateChapters } from "../utils/api/courses";
import toast from "react-hot-toast";

const EditChaptersSection = ({ chapters }: any) => {
    const { publicCourseId } = useParams<{ publicCourseId: string }>();
    const { execute: updateChaptersApi, loading } = useApi<any, any>(
        updateChapters,
        false,
        true,
    );

    const handleSubmit = (data: any) => {
        updateChaptersApi(publicCourseId, data).then(() => {
            toast.success('Chapters updated successfully');
        });
    }

    return (
        <>
            <div className="py-4 px-8 bg-white">
                <CourseForm
                    disabled={loading}
                    handleSubmitToApi={handleSubmit}
                    defaultValues={chapters}
                />
            </div>
        </>
    );
}

export default EditChaptersSection;