import { useState } from "react"
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"

const usePasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return showPassword
        ? {
              icon: (
                  <EyeClosedIcon
                      onClick={handleShowPassword}
                      className="absolute right-5 top-[30%]"
                  />
              ),
              type: "text",
          }
        : {
              icon: (
                  <EyeOpenIcon
                      onClick={handleShowPassword}
                      className="absolute right-5 top-[30%]"
                  />
              ),
              type: "password",
          }
}

export default usePasswordVisibility
