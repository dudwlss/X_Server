const BASE_URL = "http://127.0.0.1:8080";

// 공통 요청 함수
async function api(path, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    alert(data.message || "요청 중 오류 발생");
    throw new Error(data.message);
  }

  return data;
}
