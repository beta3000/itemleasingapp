import { AfterViewInit, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export declare class TdHighlightComponent implements AfterViewInit {
    private _renderer;
    private _elementRef;
    private _domSanitizer;
    private _content;
    /**
     * content?: string
     *
     * Code content to be parsed as highlighted html.
     * Used to load data dynamically.
     *
     * e.g. `.html`, `.ts` , etc.
     */
    content: string;
    /**
     * lang?: string
     *
     * Language of the code content to be parsed as highlighted html.
     * Defaults to `typescript`
     *
     * e.g. `typescript`, `html` , etc.
     */
    language: string;
    /**
     * contentReady?: function
     * Event emitted after the highlight content rendering is finished.
     */
    onContentReady: EventEmitter<undefined>;
    constructor(_renderer: Renderer2, _elementRef: ElementRef, _domSanitizer: DomSanitizer);
    ngAfterViewInit(): void;
    /**
     * General method to parse a string of code into HTML Elements and load them into the container
     */
    private _loadContent(code);
    private _elementFromString(codeStr);
    private _render(contents);
}
