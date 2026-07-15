import productModel from "../models/productModel.js";

export const getAllProducts = async () => {
    return await productModel.find();
}


export const seeInitalProduct = async() => {
    try{
        const products = [
        { title: "Protein Powder", image: "https://www.pinterest.com/pin/1149895717402824143/", price: 500, stock: 50 },
        { title: "Creatine", image: "https://www.pinterest.com/pin/1143351424171936920/", price: 300, stock: 80 },
        { title: "Omega 3", image: "https://www.pinterest.com/pin/333688653658554380/", price: 200, stock: 60 },
        { title: "Multivitamin", image: "https://www.pinterest.com/pin/910641987194215041/", price: 250, stock: 70 },
        { title: "Fat Burner", image: "https://www.pinterest.com/pin/914653005578461571/", price: 400, stock: 40 },
        { title: "Mass Gainer", image: "https://www.pinterest.com/pin/730920214561218853/", price: 600, stock: 30 },
        { title: "BCAA", image: "https://www.pinterest.com/pin/943293084476209607/", price: 350, stock: 55 },
        { title: "Pre Workout", image: "https://www.pinterest.com/pin/4606901032320704768/", price: 450, stock: 45 },
        { title: "Collagen", image: "https://www.pinterest.com/pin/909304981040751918/", price: 280, stock: 65 },
        { title: "Whey Isolate", image: "https://www.pinterest.com/pin/877920521115494817/", price: 700, stock: 25 }
    ];

    const existingProducts = await getAllProducts();

    if(existingProducts.length === 0 ){
        await productModel.insertMany(products)
    }

    }catch(err){
        console.error("Error seeding products: ", err);
    }
    
};