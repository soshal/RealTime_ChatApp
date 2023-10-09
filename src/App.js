import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Button,
  Container,
  Input,
  HStack,
} from "@chakra-ui/react";
import Message from "./Component/Message.jsx";
import ap from "./firebase.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  query,
  orderBy, // Correct import
  onSnapshot,
} from "firebase/firestore";

const auth = getAuth(ap);
const db = getFirestore(ap);

const logout = () => {
  signOut(auth);
};

const login = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

function App() {
  const q = query(collection(db, "messages"), orderBy("createdAt", "asc")); // Correct usage of orderBy
  const [user, setUser] = useState(false);
  const [messages, setMessages] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser(data);
      } else {
        setUser(false);
      }
    });

    const unSubs = onSnapshot(q, (snapshot) => {
      setMessage(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => {
      unSub();
      unSubs(); // Correct function name for unsubscribing from snapshot
    };
  }, [q]); // Added dependency array

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "messages"), {
        text: messages,
        createdAt: serverTimestamp(),
        uid: user.uid,
        photoURL: user.photoURL,
      });

      setMessages(""); // Clear input field after submission
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Box bg={"black"}>
      {user ? (
        <Container h={"100vh"} bg={"white"}>
          <VStack h={"full"} bg={"white"} spacing={4}>
            <Button onClick={logout} w={"full"} colorScheme="blue">
              Log out
            </Button>
            <VStack
              height={"full"}
              width={"full"}
              spacingY={"4"}
              overflow={"auto"}
            >
              {message.map((item) => {
                return (
                  <Message
                    key={item.id}
                    user={item.uid === user.uid ? "me" : "other"}
                    text={item.text}
                    uri={item.uri}
                  />
                );
              })}
            </VStack>
            <form style={{ width: "100%" }} onSubmit={submit}>
              <HStack>
                <Input
                  value={messages}
                  onChange={(e) => {
                    setMessages(e.target.value);
                  }}
                  placeholder="Enter a Message...."
                />
                <Button colorScheme={"purple"} type="submit" mt={4}>
                  Submit
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack h={"100vh"} bg={"white"} alignSelf={"center"}>
          <Button
            w={"full"}
            onClick={login}
            colorScheme="purple"
            justifyContent={"center"}
          >
            Login with Google
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;
