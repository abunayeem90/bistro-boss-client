import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecured from "../../../../hooks/useAxiosSecured";


const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecured = useAxiosSecured();
    const {data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecured.get(`/payments/${user.email}`)
            return res.data;
        }
    });
    return (
        <div>
            <h2 className="text-3xl">Total Paments: {payments.length} </h2>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>SL</th>
        <th>Price</th>
        <th>Transaction Id</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {payments.map((payment, index) =>  <tr key={payment._id}>
        <td>{index + 1}</td>
        <td>${payment.price}</td>
        <td>{payment.transactionId}</td>
        <td>{payment.status}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>)}
     
    </tbody>
    
  </table>
</div>
            </div>
        </div>
    );
};

export default PaymentHistory;