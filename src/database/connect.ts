import mongoose from "mongoose";

const connectDatabase = async () => {
  const url: string = "mongodb://127.0.0.1:27017/ordemDeServico";

  try {
    await mongoose.connect(url, {});
    console.log("Conectado ao MongoDB");

    // Aqui você pode definir os seus models e esquemas
  } catch (error: any) {
    console.log("Erro ao conectar:", error.message);
  }
};

export default connectDatabase;
