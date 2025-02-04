

const TextInput = ()=>{

    <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                label="Company Name"
                variant="outlined"
                {...field}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />


}