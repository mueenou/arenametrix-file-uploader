export default defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event);
    if (!files) {
      return createError({
        statusCode: 400,
        statusMessage: "Files are empty.",
      });
    }
    for (const file of files) {
      await useStorage().setItemRaw(`fs:${file.filename}`, file.data);
    }
    return 200;
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong with the API",
    });
  }
});
