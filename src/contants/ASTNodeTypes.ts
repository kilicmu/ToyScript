export enum ASTNodeTypes {
  BLOCK = 'block',
  BINARY_EXPR = 'binary expr',
  UNARY_EXPR = 'unary expr',
  VARIABLE = "variable",
  IF_STMT = "if stmt",
  WHILE_STMT = "while stmt",
  FOR_STMT = "for stmt",
  ASSIGN_STMT = "assign stmt",
  FUNCTION_DECLARE_STMT = "function declare stmt",
  DECLARE_STMT = "declare stmt",
  SCALAR = "scalar",
  RETURN_STMT = "return stmt",
  FUNCTION_ARGS = "function args",
  CALL_EXPR = "call expr",
  PROGRAM = "program"
}