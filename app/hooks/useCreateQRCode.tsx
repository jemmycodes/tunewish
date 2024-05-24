import { useQRCode } from "next-qrcode"

const useCreateQRCode = (room_id: string) => {
    const { SVG } = useQRCode()

    return (
        <SVG
            text={`${location.origin}/rooms/${room_id}`}
            options={{
                width: 1,
                margin: 4,
                color: {
                    dark: "#000000",
                    light: "#ffffff",
                },
            }}
        />
    )
}

export default useCreateQRCode
