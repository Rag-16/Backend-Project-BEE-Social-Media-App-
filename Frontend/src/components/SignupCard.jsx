// import {
// 	Flex,
// 	Box,
// 	FormControl,
// 	FormLabel,
// 	Input,
// 	InputGroup,
// 	HStack,
// 	InputRightElement,
// 	Stack,
// 	Button,
// 	Heading,
// 	Text,
// 	useColorModeValue,
// 	Link,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import authScreenAtom from "../atoms/authAtom";
// import {useSetRecoilState} from 'recoil';

// export default function SignupCard() {
//     const [showPassword, setShowPassword]= useState(false);
//     const setAuthScreen= useSetRecoilState(authScreenAtom);
//     const [inputs,setInputs] = useState({
//         name:"",
//         username:"",
//         email:"",
//         password:"",
//     });
//     const handleSignup = async () => {
//         console.log(inputs);

//         try {
//             // const res= await fetch("/api/users/signup",{

//             // method: "POST",
//             // headers: {
//             //     "Content-Type":"application/json",
//             // },
//             // //   body:JSON.stringify(),

//             //     })

//         } catch (error) {
//             console.log(error);


//         }
//     }

//     return(
//         <Flex   align={'center'}   justify={'center'} >
//             <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
//                 <Stack align={'center'}>
//                     <Heading fontSize={'4x1'} textAlign={'center'}>
//                         Sign up
//                     </Heading>

//                 </Stack>
//                 <Box rounded={"lg"} bg={useColorModeValue("white","gray.dark")} boxShadow={"lg"} p={8}>
//                     <Stack spacing={4}>
//                         <HStack>
//                             <Box>
//                                 <FormControl  isRequired>
//                                     <FormLabel>Full Name</FormLabel>
//                                     <Input type='text'
//                                     onChange={(e) => setInputs({...inputs,name: e.target.value})}
//                                     value={inputs.name}
//                                     />

//                                 </FormControl>
//                             </Box>
//                             <Box>
//                                 <FormControl isRequired >
//                                     <FormLabel>Username</FormLabel>
//                                     <Input type='text'
//                                  onChange={(e) => setInputs({...inputs,name: e.target.value})}
//                                       value={inputs.username}
//                                     />
//                                 </FormControl>
//                             </Box>
//                         </HStack>
//                         <FormControl  isRequired>
//                             <FormLabel>Email address</FormLabel>
//                             <Input type='email'
//                             onChange={(e) => setInputs({...inputs,name: e.target.value})}
//                             value={inputs.email}
//                             />
//                         </FormControl>
//                         <FormControl isRequired>
//                             <FormLabel>Password</FormLabel>
//                             <InputGroup>
//                             <Input type={showPassword ? "text" : "password"}
//                   onChange={(e) => setInputs({...inputs,name: e.target.value})}
//                           value={inputs.password}
//                             />
//                             <InputRightElement h={"full"}>
//                             <Button
//                             variant={"ghost"}
//                             onClick={() => setShowPassword((showPassword) => !showPassword)}
//                             >
//                                 {showPassword ? <ViewIcon /> : <ViewOffIcon />}
//                             </Button>
//                             </InputRightElement>
//                                   </InputGroup>
//                         </FormControl>
//                         <Stack spacing={10} pt={2}>
//                             <Button
//                             loadingText='Submitting'
//                             size='lg'
//                             bg={useColorModeValue("gray.600","gray.700")}
//                             color={"white"}
//                             _hover={{
//                                 bg: useColorModeValue("gray.700","gray.800"),
//                             }}

//                             >
//                                 Sign up
//                             </Button>
//                         </Stack>
//                         <Stack pt={6}>
//                             <Text align={"center"}>
//                                 Already a user? <Link color={"blue.400"}
//                                 onClick={() => setAuthScreen("login")}
//                                 >Login</Link>
//                             </Text>
//                         </Stack>
//                     </Stack>
//                 </Box>
//             </Stack>
//         </Flex>
//     );
// }


import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import authScreenAtom from "../atoms/authAtom";
import { useSetRecoilState } from 'recoil';
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const showToast = useShowToast();
    const setUser = useSetRecoilState(userAtom);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };
    // const handleSignup = async () => {
    //     try {
    //         // Make the request to the API
    //         const res = await fetch("/api/users/signup", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(inputs),
    //         });

    //         // Check if the response is not OK
    //         if (!res.ok) {
    //             // Extract error message from response
    //             const errorData = await res.json();
    //             throw new Error(errorData.message || 'Something went wrong');
    //         }

    //         // Parse the response if the request was successful
    //         const data = await res.json();
    //         console.log("Signup successful:", data);

    //         // Optionally handle successful signup (e.g., redirect, show success message)

    //     } catch (error) {
    //         // Handle and display error
    //         console.error("Signup failed:", error.message);

    //         // Optionally show an error message to the user
    //         // e.g., use a toast notification or alert
    //     }
    // };
    const handleSignup = async () => {
        try {
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();

            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            localStorage.setItem("user-Threads", JSON.stringify(data));
            setUser(data);

        } catch (error) {
            showToast("Error", error, "error");

                };
    };

    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                </Stack>
                <Box rounded={"lg"} bg={useColorModeValue("white", "gray.dark")} boxShadow={"lg"} p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        type='text'
                                        name='name'
                                        onChange={handleChange}
                                        value={inputs.name}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        type='text'
                                        name='username'
                                        onChange={handleChange}
                                        value={inputs.username}
                                    />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type='email'
                                name='email'
                                onChange={handleChange}
                                value={inputs.email}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    onChange={handleChange}
                                    value={inputs.password}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                                    >
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText='Submitting'
                                size='lg'
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={"white"}
                                _hover={{
                                    bg: useColorModeValue("gray.700", "gray.800"),
                                }}
                                onClick={handleSignup}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Already a user? <Link color={"blue.400"} onClick={() => setAuthScreen("login")}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}