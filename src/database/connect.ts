import mongoose from "mongoose";

const connectDatabase = async () => {
  const url = process.env.DATABASE;

  try {
    if (!url) throw new Error("url do database inválida");

    await mongoose.connect(url, {});
    console.log("conectado com sucesso ao mongoDb");
    // Aqui você pode definir os seus models e esquemas
  } catch (error: any) {
    console.log("Erro ao conectar:", error.message);
  }
};

export default connectDatabase;
