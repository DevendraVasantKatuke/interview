```
const myObj = {
  name: { firstName: "Ifeoma", lastName: "Imoh" },
};

console.log(myObj.location.street); // throws an error -- cannot read property of undefined because location is not defined in myObj

console.log(myObj.location?.street); // safely prints undefined but doesn’t throw any error.
```
```
 import { useLocation } from "react-router-dom";
    import React, { useState } from "react";

    function ReceivingComponent() {
      const [name, setName] = useState("");
      const location = useLocation();
      const firstName = location.state.data?.firstName;
      useEffect(() => {
        setName(firstName);
      }, [firstName]);
      return (
        //some jsx here...
      );
    }
```