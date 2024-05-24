interface RoomDetailsProps {
    params: {
        slug: string
    }
}

const RoomDetails = ({ params }: RoomDetailsProps) => {
    return <p>Room {params.slug}</p>
}

export default RoomDetails
