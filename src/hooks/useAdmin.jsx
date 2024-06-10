import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecured from "./useAxiosSecured";


const useAdmin = () => {
    const { user} = useAuth();
    const axiosSecured = useAxiosSecured();
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        // enabled: !loading,
        queryFn: async () => {

            const res = await axiosSecured.get(`/users/admin/${user?.email}`)
            console.log(res.data);
            return res.data?.admin;
        }
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;