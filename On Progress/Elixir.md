- invoke terminal using 'iex`
```
# index.exs
defmodule Hello do
    def world do
        IO.puts "Hello World"
    end
end
```
on cmd use `iex index.exs`

compile using `elixir index.exs`
```
# prints 3
case {1, 2, 3} do
    {1, 2, 3} ->
        IO.puts x
    _ -> IO.puts "Sorry"
end
```