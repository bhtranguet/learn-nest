export interface EnvConfig {
  // Đôi khi bạn không biết key nhưng biết shape của value
  // Nghĩa là tất cả value đều là string.
  [key: string]: string;
}
