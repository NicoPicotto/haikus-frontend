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
         <div className='container mx-auto p-4'>
            <div className='flex items-center justify-between mb-5'>
               <h1 className='text-2xl font-bold'>Vegan Split</h1>
               <ModeToggle />
            </div>

            <Card className='mb-4'>
               <CardHeader>
                  <CardTitle>Añadir nuevo item</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className='flex flex-col space-y-4'>
                     <div className='flex flex-col space-y-4'>
                        <div className='flex flex-col space-y-2'>
                           <Label htmlFor='item-name'>Nombre</Label>
                           <Input
                              id='item-name'
                              value={newItem.name}
                              onChange={(e) =>
                                 setNewItem({
                                    ...newItem,
                                    name: e.target.value,
                                 })
                              }
                              placeholder='Ej: Coca Cola'
                           />
                        </div>
                        <div className='flex flex-col space-y-2'>
                           <Label htmlFor='item-price'>Precio</Label>
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
                              placeholder='Ej: 3000'
                           />
                        </div>
                     </div>
                     <div className='flex items-center space-x-2'>
                        <Switch
                           id='carnivorous'
                           checked={newItem.isCarnivorous}
                           onCheckedChange={(checked: boolean) =>
                              setNewItem({ ...newItem, isCarnivorous: checked })
                           }
                        />
                        <Label htmlFor='carnivorous'>¿Es algo con carne?</Label>
                     </div>
                     <Button onClick={addItem}>Añadir a la lista</Button>
                  </div>
               </CardContent>
            </Card>

            <Card className='mb-4'>
               <CardHeader>
                  <CardTitle>Lista de compras</CardTitle>
               </CardHeader>
               <CardContent>
                  <ul className='space-y-2'>
                     {items.map((item) => (
                        <li
                           key={item.id}
                           className='flex justify-between items-center'
                        >
                           <span>
                              {item.name}
                              {"  "}
                              {item.isCarnivorous ? "🍖" : ""}
                           </span>
                           <span>${item.price.toFixed(2)} </span>
                        </li>
                     ))}
                  </ul>
               </CardContent>
            </Card>

            <Card className='mb-4'>
               <CardHeader>
                  <CardTitle>Información del grupo</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className='flex flex-col space-y-4'>
                     <div className='flex flex-col space-y-2'>
                        <Label htmlFor='non-vegan-count'>Carnacas</Label>
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
                     <div className='flex flex-col space-y-2'>
                        <Label htmlFor='vegan-count'>Veganos</Label>
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
