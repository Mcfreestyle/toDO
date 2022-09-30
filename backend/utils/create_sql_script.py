def create_SQL_script(tables_dict={}):
  """
    Create a dummy file
    Args:
      tables_dict = For example:
        {
          users: ["(1, 'Michael', '123', ...)", "(2, 'Destino', '456', ...)"],
          todo_lists: ["(1, 'lista1', ...)", "(2, 'lista2', ...)"]
        }
  """
  filename = "./sql-scripts/feed_database.sql"

  idx = 0
  spacing = "\n\n\n"

  start = """--
-- Dumping dummy data for {0}
--
INSERT INTO `{0}` VALUES
"""

  with open(filename, mode="w", encoding="utf-8") as new_file:
    for key, value in tables_dict.items():
      idx += new_file.write(spacing)
      idx += new_file.write(start.format(key))
      # loop over list (value)
      for row in value:
        row = (row + ';') if row == value[-1] else (row + ',')
        idx += new_file.write(row)
        idx += new_file.write("\n")

  print("{} bytes written in file {}".format(idx, filename))
