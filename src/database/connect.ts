import mongoose from "mongoose";

const connectDatabase = async () => {
  const url: string = "mongodb+srv://admin:admin@cursonodejs.31lneyh.mongodb.net/test";

  try {
    await mongoose.connect(url, {});

    // Aqui você pode definir os seus models e esquemas
  } catch (error: any) {
    console.log("Erro ao conectar:", error.message);
  }
};

export default connectDatabase;
