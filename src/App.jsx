import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("ETH");
  
  const [displayedValue, setDisplayedValue] = useState("");
  const [displayTimeout, setDisplayTimeout] = useState(null);

  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsMenuOpen(false);
  };
  const handleAmount = (e) => {
    const newValue = e.target.value;
    

    // Clear any existing timeout
    if (displayTimeout) {
      clearTimeout(displayTimeout);
    }

    // Set a timeout to update the displayed value after one second
    const timeoutId = setTimeout(() => {
      setDisplayedValue(newValue);
    }, 1000);

    // Store the timeout ID in the state
    setDisplayTimeout(timeoutId);
  };

  // useEffect to clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (displayTimeout) {
        clearTimeout(displayTimeout);
      }
    };
  }, [displayTimeout]);



  return (
    <div className="text-white">
      <div className="relative flex p-6 mt-20 bg text-white bg-gray-900 justify-between ">
        <div className="w-max">
          <ul className=" relative flex gap-20 bg-gray-800 rounded-3xl items-center pr-10 font-semibold">
            <li className="text-black bg-white p-2 pl-10 pr-10 rounded-3xl">
              Open
            </li>
            <li>Close</li>
            <li>Boost</li>
          </ul>
        </div>
        <div>
          <div className="bg-black w-80 h-10 rounded-sm "></div>
        </div>
      </div>
      <div className="flex justify-center h-full">
        <div className="relative bg-gray-900 m-6 ml-8 w-1/2 p-10">
          <div className="font-semibold">Select Asset</div>
          <div>
            <div className="relative mt-4">
              <button
                className="bg-black p-2 rounded-md border border-gray-700 w-full"
                onClick={toggleMenu}
              >
                <div className="flex relative items-center justify-between ">
                  <div>{selectedItem}</div>
                  <div>
                    <MdKeyboardArrowDown />
                  </div>
                </div>
              </button>
              {isMenuOpen && (
                <div className="absolute mt-2 p-2 bg-black border w-80 rounded-md shadow-md border-gray-700">
                  <div
                    className={`cursor-pointer hover:bg-slate-800 rounded-md p-2 ${
                      selectedItem === "ETH" ? "font-bold" : ""
                    }`}
                    onClick={() => handleItemClick("ETH")}
                  >
                    ETH
                  </div>
                  <div
                    className={`cursor-pointer hover:bg-slate-800 rounded-md p-2 ${
                      selectedItem === "LTC" ? "font-bold" : ""
                    }`}
                    onClick={() => handleItemClick("LTC")}
                  >
                    LTC
                  </div>
                  <div
                    className={`cursor-pointer hover:bg-slate-800 rounded-md p-2 ${
                      selectedItem === "BTC" ? "font-bold" : ""
                    }`}
                    onClick={() => handleItemClick("BTC")}
                  >
                    BTC
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=" mt-4">
            <div className="flex justify-between items-center mt-3">
              <div className="font-semibold">Borrow Amount</div>
              <div className="relative border border-gray-700 p-2 rounded-lg font-semibold">
                Max hold Amount 200
              </div>
            </div>
            <div className="mt-4">
              <input
                className="bg-gray-900 border border-gray-600 w-full rounded-md h-11 p-3"
                type="number"
                placeholder="Enter Suppy Amount"
                onChange={handleAmount}
              />
            </div>
          </div>
          <div className="relative">
            <div className="relative bg-black w-full h-20 mt-6 "></div>
            <div className="reltive flex justify-between">
            <div></div>
            <button className=" relative bg-white text-black p-2 font-semibold rounded-md pl-4 pr-4 justify-items-end mt-2">
              Execute
            </button>
            </div>
          </div>
        </div>
        <div className=" relative w-1/2 m-6 gap-4 flex flex-col">
          <div className="bg-black border border-gray-600 w-full h-3/4 rounded-lg">{displayedValue}</div>
          <div className="bg-black border border-gray-600 w-full h-1/2 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
