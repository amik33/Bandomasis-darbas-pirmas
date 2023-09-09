import { Link } from "react-router-dom"

export function List () {
    return (
    <div className="container px-4 py-3" id="featured-3">
    <h2 className="pb-3 border-bottom">List page</h2>
    <div className="row g-4 py-3 row-cols-1 row-cols-lg-3">
        <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">List content</h3>
            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <Link to="/" className="icon-link">
                Call to action
            </Link>
        </div>
        <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">List content</h3>
            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <Link to="/" className="icon-link">
                Call to action
            </Link>
        </div>
        <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">List content</h3>
            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <Link to="/" className="icon-link">
                Call to action
            </Link>
        </div>
        <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">List content</h3>
            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <Link to="/" className="icon-link">
                Call to action
            </Link>
        </div>
        <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">List content</h3>
            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <Link to="/" className="icon-link">
                Call to action
            </Link>
        </div>
        <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
            <h3 className="fs-2 text-body-emphasis">List content</h3>
            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <Link to="/" className="icon-link">
                Call to action
            </Link>
        </div>
    </div>
</div>
)
}