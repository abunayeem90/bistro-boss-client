import {useQuery} from '@tanstack/react-query'
import useAxiosSecured from './useAxiosSecured';
import useAuth from './useAuth';

const useCart = () => {
    // tan stack query
    const axiosSecured = useAxiosSecured();
    const {user} = useAuth();
    const {refetch ,data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecured.get(`/carts?email=${user.email}`)
            return res.data;

        }

    })
    return [cart, refetch]
};

export default useCart;