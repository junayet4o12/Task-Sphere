// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ClientCard from "./ClientCard";

const Clients = () => {
    const axiosPublic = useAxiosPublic()
    const { data: clients, isLoading: clientsLoading } = useQuery({
        queryKey: ['clients'],
        queryFn: async () => {

            const res = await axiosPublic.get(`/clients`)
            return res?.data
        }
    })
    if (clientsLoading) {
        return ''
    }
    return (
        <div className="py-7 px-3">
            <h2 className="text-3xl font-bold uppercase text-center py-7">Diverse User Profiles</h2>

            <div className="flex flex-wrap justify-center gap-6">
                {
                    clients.map(client => <ClientCard key={client?._id} client={client}></ClientCard>)
                }
            </div>
        </div>
    );
};

export default Clients;