import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Item {
   id: number;
   name: string;
   price: number;
   isCarnivorous: boolean;
}
import "./App.css";
import { ModeToggle } from "./components/mode-toggle";

function App() {
   const [items, setItems] = useState<Item[]>([]);
   const [newItem, setNewItem] = useState({
      name: "",
      price: "",
      isCarnivorous: false,
   });
   const [veganCount, setVeganCount] = useState(0);
   const [nonVeganCount, setNonVeganCount] = useState(0);
   const [splitResult, setSplitResult] = useState<{
      vegan: number;
      nonVegan: number;
   } | null>(null);

   const addItem = () => {
      if (newItem.name && newItem.price) {
         setItems([
            ...items,
            { ...newItem, id: Date.now(), price: parseFloat(newItem.price) },
         ]);
         setNewItem({ name: "", price: "", isCarnivorous: false });
      }
   };

   const calculateSplit = () => {
      const veganTotal = items
         .filter((item) => !item.isCarnivorous)
         .reduce((sum, item) => sum + item.price, 0);
      const carnivorousTotal = items
         .filter((item) => item.isCarnivorous)
         .reduce((sum, item) => sum + item.price, 0);

      const veganShare = veganTotal / (veganCount + nonVeganCount);
      const nonVeganShare = veganShare + carnivorousTotal / nonVeganCount;

      setSplitResult({
         vegan: veganShare,
         nonVegan: nonVeganShare,
      });
   };

   return (
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
         <ModeToggle />
         <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>
               Vegan-Friendly Expense Splitter
            </h1>

            <Card className='mb-4'>
               <CardHeader>
                  <CardTitle>Add New Item</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className='grid gap-4'>
                     <div className='grid grid-cols-2 gap-4'>
                        <div>
                           <Label htmlFor='item-name'>Item Name</Label>
                           <Input
                              id='item-name'
                              value={newItem.name}
                              onChange={(e) =>
                                 setNewItem({
                                    ...newItem,
                                    name: e.target.value,
                                 })
                              }
                              placeholder='Enter item name'
                           />
                        </div>
                        <div>
                           <Label htmlFor='item-price'>Price</Label>
                           <Input
                              id='item-price'
                              type='number'
                              value={newItem.price}
                              onChange={(e) =>
                                 setNewItem({
                                    ...newItem,
                                    price: e.target.value,
                                 })
                              }
                              placeholder='Enter price'
                           />
                        </div>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <Switch
                           id='carnivorous'
                           checked={newItem.isCarnivorous}
                           onCheckedChange={(checked) =>
                              setNewItem({ ...newItem, isCarnivorous: checked })
                           }
                        />
                        <Label htmlFor='carnivorous'>Carnivorous</Label>
                     </div>
                     <Button onClick={addItem}>Add Item</Button>
                  </div>
               </CardContent>
            </Card>

            <Card className='mb-4'>
               <CardHeader>
                  <CardTitle>Items List</CardTitle>
               </CardHeader>
               <CardContent>
                  <ul className='space-y-2'>
                     {items.map((item) => (
                        <li
                           key={item.id}
                           className='flex justify-between items-center'
                        >
                           <span>{item.name}</span>
                           <span>
                              ${item.price.toFixed(2)}{" "}
                              {item.isCarnivorous ? "(Carnivorous)" : ""}
                           </span>
                        </li>
                     ))}
                  </ul>
               </CardContent>
            </Card>

            <Card className='mb-4'>
               <CardHeader>
                  <CardTitle>Group Information</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className='grid grid-cols-2 gap-4'>
                     <div>
                        <Label htmlFor='vegan-count'>Vegan Count</Label>
                        <Input
                           id='vegan-count'
                           type='number'
                           value={veganCount}
                           onChange={(e) =>
                              setVeganCount(parseInt(e.target.value) || 0)
                           }
                           min='0'
                        />
                     </div>
                     <div>
                        <Label htmlFor='non-vegan-count'>Non-Vegan Count</Label>
                        <Input
                           id='non-vegan-count'
                           type='number'
                           value={nonVeganCount}
                           onChange={(e) =>
                              setNonVeganCount(parseInt(e.target.value) || 0)
                           }
                           min='0'
                        />
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Button onClick={calculateSplit} className='w-full mb-4'>
               Calculate Split
            </Button>

            {splitResult && (
               <Card>
                  <CardHeader>
                     <CardTitle>Split Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p>
                        Vegan share: ${splitResult.vegan.toFixed(2)} per person
                     </p>
                     <p>
                        Non-vegan share: ${splitResult.nonVegan.toFixed(2)} per
                        person
                     </p>
                  </CardContent>
               </Card>
            )}
         </div>
      </ThemeProvider>
   );
}

export default App;
