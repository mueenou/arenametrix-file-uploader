export default defineEventHandler(async (event) => {
  console.log("here");
  try {
    const { id, fileName } = await readBody(event);
    await useStorage().removeItem(`fs:${fileName}`);
    return 200;
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong with the API",
    });
  }
});
