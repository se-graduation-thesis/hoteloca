import img from "./NotFound404.jpg"
export default function NotFound() {
    return (
        <div >
            <img src={img} style={{ width: "100%" }} alt="notfound" />
        </div >
    );
}